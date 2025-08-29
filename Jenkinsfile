pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            agent {
                docker{
                    image 'node:22'
                    reuseNode true
                }
            }
            stages{
                stage('NPM install'){
                    steps {
                     sh 'npm install'
                    }
                }
            }
            
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }
}