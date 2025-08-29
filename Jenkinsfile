pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t backend-test .'
            }
        }
        stage('Run Docker Container') {
            steps {
                bat 'docker run -d -p 4000:4000 --name backend-test backend-test'
            }
        }
    }
}