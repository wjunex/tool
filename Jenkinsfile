pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJS'  // 你需要在 Jenkins 中设置 NodeJS 环境
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                // 拉取代码
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // 安装依赖
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                // 构建 Vue 3 应用
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                // 部署到目标服务器
                script {
                    // 假设你要将构建后的应用复制到远程服务器
                    sh 'scp -r dist/* user@your-server:/path/to/your/site'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
