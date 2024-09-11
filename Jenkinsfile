pipeline {
    agent any

    environment {
        jenkinsRegistryCredential = 'test-credential-setup-cicd'
        DOCKERHUB_CREDENTIALS = credentials('test-credential-setup-cicd')
    }

    stages {
        stage("Cloning the repository") {
            steps {
                git branch: "setup/CICD",
                    url: "https://github.com/Ninehcobra-Bale-Bros/Furniture-Exchange.git"
            }

            steps {
                withDockerRegistry(credentialsId: registryCredential, url: "https://index.docker.io/v1/") {
                    sh 'echo $DOCKERHUB_CREDENTIALS_USR'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW'
                    echo "Docker registry is ready"
                }
            }
        }
    }
}