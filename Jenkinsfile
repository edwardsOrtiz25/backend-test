pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // usa el nombre configurado en Jenkins
        maven 'Maven'   // si también configuraste Maven
    }

    environment {
        SCANNER_HOME = tool 'SonarQubeScanner'  // Nombre configurado en Manage Jenkins > Tools
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
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test -- --coverage'
            }
            post {
                always {
                    junit 'reports/junit/**/*.xml'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                          -Dsonar.projectKey=backend-test \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://localhost:8084 \
                          -Dsonar.login=\$SONARQUBE_TOKEN
                    """
                }
            }
        }

        stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}