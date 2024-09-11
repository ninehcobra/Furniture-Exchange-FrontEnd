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

        stage("Deploying to devepment environment") {
            steps {
                echo "Docker registry is ready"
                
                sh "docker network create dev || echo 'Network already exists'"
                sh "docker container stop nestjs-architecture || echo 'No container running'"
                sh "echo y | docker container prune"
                sh "pwd && ls -la"
                sh "ls -la ${WORKSPACE}"

                sh "docker image pull baledev/test:cicd"
                sh "docker container run -d --name furniture-exchange-test --network dev -p 3000:3000 baledev/test:cicd"
            }
        }
    }
    
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}