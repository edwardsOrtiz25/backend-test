pipeline {
    agent any

    tools {
        sonarScanner 'SonarQubeScanner'   
    }

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
                withSonarQubeEnv('SonarQube') {   
                    bat """
                        sonar-scanner ^
                        -Dsonar.projectKey=backend-test ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        -Dsonar.login=%SONARQUBE_AUTH_TOKEN%
                    """
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