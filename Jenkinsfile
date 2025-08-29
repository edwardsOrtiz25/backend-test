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

        stage ('Etapa de empaquetado y delivery'){
          steps {
            bat 'docker build -t backend-test .'
            bat 'docker tag backend-test edwardsortiz25/backend-test'
            bat 'docker login'
            bat 'docker push edwardsortiz25/backend-test'
          }
        }
    }
}