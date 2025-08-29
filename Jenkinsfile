pipeline {
    agent any
    stages {
        stage('Test K8s Connection') {
            steps {
                // credentialsId debe coincidir con el Secret File que creaste
                withKubeConfig([credentialsId: 'k8s-cred']) {
                    bat 'kubectl get nodes'
                }
            }
        }
    }
}