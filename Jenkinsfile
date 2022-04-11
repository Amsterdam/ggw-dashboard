#!groovy
def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block()
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'
        throw t
    }
    finally {
        if (tearDown) {
            tearDown()
        }
    }
}

String BUILD_ID = "${Math.abs(new Random().nextInt() % 600) + 1}"

node {
    stage("Checkout") {
        checkout scm
    }
}

node {
    // stage('Test') {
    //     tryStep "test", {
    //         sh "docker-compose up --abort-on-container-exit test-unit"
    //     }
    // }
    stage("Build and push acceptance image") {
        tryStep "build image", {
            def image = docker.build("docker-registry.secure.amsterdam.nl/ois/ggw:${BUILD_ID}",
                "--shm-size 1G " +
                "--build-arg BUILD_ENV=acc" +
                " .")
            image.push("acceptance")
        }
    }
    
    stage("Deploy to ACC") {
        tryStep "deployment", {
            build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy.yml'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_ggw"]
                ]
        }
    }
}
String BRANCH = "${env.BRANCH_NAME}"
if (BRANCH == "master") {
    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'GGW Dashboard is waiting for Production Release - please confirm'
        input "Deploy to Production?"
    }
    node {
        stage('Push production image') {
            tryStep "image tagging", {
                def image = docker.image("docker-registry.secure.amsterdam.nl/ois/ggw:acceptance")
                image.push("production")
                image.push("latest")
            }
        }
    }
    node {
        stage("Deploy") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                    parameters: [
                        [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                        [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy.yml'],
                        [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_ggw"]
                    ]
            }
        }
    }
}
