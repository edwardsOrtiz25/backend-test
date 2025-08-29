pipeline {
    agent any

    environment {
        // ID del servidor SonarQube configurado en Jenkins
        SONARQUBE_SERVER = 'MySonarQube'
        // Token almacenado en Jenkins como Secret Text
        SONARQUBE_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('SonarQube Test Connection') {
            steps {
                script {
                    echo "Probando conexión con SonarQube..."

                    withSonarQubeEnv('MySonarQube') {
                        // Ejecuta un comando de sonar-scanner para validar conexión
                        // En Windows se puede usar bat
                        bat """
                        sonar-scanner ^
                            -Dsonar.projectKey=prueba-jenkins ^
                            -Dsonar.sources=. ^
                            -Dsonar.host.url=%SONAR_HOST_URL% ^
                            -Dsonar.login=%SONARQUBE_TOKEN%
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
    }

    post {
        always {
            echo "Prueba de conexión SonarQube finalizada."
        }
    }
}