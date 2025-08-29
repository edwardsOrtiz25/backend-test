pipeline {
    agent any

    tools {
        nodejs "NodeJS"   // Nombre de tu NodeJS configurado en Jenkins
    }

    environment {
        // Configuración de SonarQube: el nombre debe coincidir con el que configuraste en Jenkins (Manage Jenkins > System > SonarQube servers)
        SONARQUBE_SERVER = "MySonarQube"  
        SCANNER_HOME = "C:\\sonar-scanner\\bin" // Ajusta la ruta a donde tengas sonar-scanner en tu Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/edwardsOrtiz25/backend-test.git'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Coverage') {
            steps {
                // Asegura que se cree carpeta coverage
                bat 'mkdir coverage || echo "carpeta ya existe"'
                bat 'npm run coverage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    bat "\"${SCANNER_HOME}\\sonar-scanner.bat\" -Dsonar.projectKey=backend-test -Dsonar.sources=. -Dsonar.host.url=http://localhost:8084 -Dsonar.login=admin -Dsonar.password=admin123"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("backend-test:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Publish Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image("backend-test:${env.BUILD_NUMBER}").push("latest")
                    }
                }
            }
        }
    }

    post {
        always {
            junit 'reports/**/*.xml'  // Publicar resultados de tests
            archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
        }
        success {
            echo "Pipeline completado exitosamente ✅"
        }
        failure {
            echo "El pipeline falló ❌"
        }
    }
}