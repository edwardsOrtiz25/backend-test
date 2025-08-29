pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
        SONAR_URL = 'http://localhost:8084'
    }

    stages {

        stage('Test SonarQube Connection') {
            steps {
                echo "Probando conexión SonarQube vía API con curl..."
                bat """
                curl -u %SONAR_TOKEN%: %SONAR_URL%/api/server/version
                """
            }
        }

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

        stage('Test K8s Connection') {
            steps {
                withKubeConfig([credentialsId: 'k8s-cred']) {
                    bat 'kubectl get nodes'
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
                    docker.withRegistry('http://localhost:8082', 'nexus-credentials') {
                        bat 'docker tag backend-test:latest localhost:8082/docker-hosted/backend-test:latest'
                        bat 'docker push localhost:8082/docker-hosted/backend-test:latest'
                    }
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