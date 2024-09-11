pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('test-credential-setup-cicd')
    }

    stages {
        stage("Cloning the github repository") {
            steps {
                echo "Cloning the github repository"

                git branch: "setup/CICD",
                    url: "https://github.com/Ninehcobra-Bale-Bros/Furniture-Exchange.git"
            }
        }

        stage("Login to dockerhub") {
             steps {
                withDockerRegistry(credentialsId: "test-credential-setup-cicd", url: "https://index.docker.io/v1/") {
                    echo "Docker registry is ready"

                    sh "docker build -t baledev/test:cicd ."
                    sh "docker push baledev/test:cicd"
                }
            }
        }
    }
}