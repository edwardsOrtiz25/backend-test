pipeline {
    agent any

    environment {
        // Variables de Nexus y Kubernetes
        NEXUS_URL = 'http://localhost:8082'
        NEXUS_CRED = 'nexus-credentials'
        K8S_CRED = 'k8s-cred'
        IMAGE_NAME = 'backend-test'
    }

    stages {

        stage('Install dependencies') {
            steps {
                echo "Instalando dependencias npm..."
                bat 'npm install'
            }
        }

        stage('Run Tests & Generate Coverage') {
            steps {
                echo "Ejecutando tests con cobertura..."
                bat 'npm run test:cov'
            }
        }

        stage('Build Project') {
            steps {
                echo "Construyendo proyecto..."
                bat 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // Nombre que le pusiste en "Configure System" del plugin
                    echo "Ejecutando análisis SonarQube..."
                    bat """
                    sonar-scanner ^
                        -Dsonar.projectKey=backend-test ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=%SONAR_HOST_URL% ^
                        -Dsonar.login=%SONAR_AUTH_TOKEN% ^
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info ^
                        -Dsonar.coverage.exclusions=node_modules/**,tests/**
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                echo "Esperando resultado de Quality Gate..."
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Construyendo imagen Docker..."
                    bat "docker build -t %IMAGE_NAME%:latest ."
                    bat "docker tag %IMAGE_NAME%:latest %NEXUS_URL%/docker-hosted/%IMAGE_NAME%:${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Push Docker Image to Nexus') {
            steps {
                script {
                    docker.withRegistry("%NEXUS_URL%", "%NEXUS_CRED%") {
                        echo "Subiendo imagen Docker con tag latest y build number..."
                        bat "docker push %NEXUS_URL%/docker-hosted/%IMAGE_NAME%:latest"
                        bat "docker push %NEXUS_URL%/docker-hosted/%IMAGE_NAME%:${env.BUILD_NUMBER}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: '%K8S_CRED%']) {
                    echo "Aplicando kubernetes.yaml..."
                    bat "kubectl apply -f kubernetes.yaml"
                    echo "Verificando despliegue..."
                    bat "kubectl rollout status deployment/backend-test"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completado."
        }
    }
}