pipeline {
    agent any
    stages {
        stage('Test K8s Connection') {
            steps {
                withKubeConfig([credentialsId: 'k8s-cred']) {
                    sh 'kubectl get nodes'
                }
            }
        }
    }
}