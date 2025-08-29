pipeline {
    agent {
        docker { image 'node:18' }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}