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
        stage('Check Docker') {
         steps {
        bat 'docker info'
          }
        }

        stage ('Etapa de empaquetado y delivery'){
          steps {
            bat 'docker build -t backend-test .'
            bat 'docker tag backend-test edwardsortiz25/backend-test:latest'
            stage('Test Docker Login') {
              steps {
                script {
                 withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                   bat """
                   docker logout
                   docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                   docker info
                    """
                    }
                  }
                }
              }
            bat 'docker push edwardsortiz25/backend-test:latest'
          }
        }
    }
}