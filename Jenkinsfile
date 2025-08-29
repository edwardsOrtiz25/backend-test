pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test:cov'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Obtener la ruta de SonarQube Scanner configurado en Jenkins
                    def scannerHome = tool 'SonarQubeScanner' // Nombre de tu instalación en Global Tool Configuration
                    withSonarQubeEnv('SonarQube') {        // Nombre del servidor SonarQube en Jenkins
                        bat "\"${scannerHome}\\bin\\sonar-scanner.bat\" ^
                            -Dsonar.projectKey=backend-test ^
                            -Dsonar.sources=. ^
                            -Dsonar.host.url=http://localhost:8084 ^
                            -Dsonar.login=%SONARQUBE_AUTH_TOKEN%"
                    }
                }
            }
        }

        stage('Check Docker') {
            steps {
                bat 'docker info'
            }
        }

        stage('Etapa de empaquetado y delivery') {
            steps {
                script {
                    docker.withRegistry('http://localhost:8082','nexus-credentials'){
                        bat 'docker tag backend-test:latest localhost:8082/docker-hosted/backend-test:latest'
                        bat 'docker push localhost:8082/docker-hosted/backend-test:latest'
                    }
                }
            }
        }
    }
}