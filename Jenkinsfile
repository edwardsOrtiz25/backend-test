pipeline {
    agent any

    environment {
        // ID del servidor SonarQube configurado en Jenkins
        SONARQUBE_SERVER = 'MySonarQube'
        // Token almacenado en Jenkins como Secret Text
        SONARQUBE_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Compilando proyecto..."
                // Ajusta este comando según tu proyecto:
                // Para .NET:
                bat 'dotnet build'
                // Para Node.js:
                // sh 'npm install && npm run build'
                // Para Maven:
                // sh 'mvn clean install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarQube') {
                    // Para .NET:
                    bat "dotnet sonarscanner begin /k:\"mi-proyecto\" /d:sonar.login=\"${SONARQUBE_TOKEN}\""
                    bat "dotnet build"
                    bat "dotnet sonarscanner end /d:sonar.login=\"${SONARQUBE_TOKEN}\""

                    // Para Node o genérico puedes usar:
                    // sh "sonar-scanner -Dsonar.projectKey=mi-proyecto -Dsonar.sources=. -Dsonar.login=${SONARQUBE_TOKEN}"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado."
        }
    }
}