pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('sonar-token')
        SONAR_URL = 'https://tuservidorsonar.com'
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
    }
}