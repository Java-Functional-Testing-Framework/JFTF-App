# JFTF-App

JFTF-App is the main control application for the Java Functional Testing Framework (JFTF). It provides a web-based user interface for managing test reports, planning test case executions, and interfacing with the JFTF-Core API for executing JFTF-Lib applications.

JFTF-App is built using React Admin, a popular open-source framework for building web-based admin interfaces. The repository also includes a JFTF-Lib SDK for building JFTF applications.

## Features

- Web-based user interface for managing test reports and test case executions
- Integration with JFTF-Core API for executing JFTF-Lib applications
- User authentication and authorization
- Role-based access control
- Responsive design that works on desktop and mobile devices

## Getting Started (**WIP**)

To get started with JFTF-App, check out the documentation on our [website](https://www.javafunctionaltestingframework.com/docs/app).

## Configuration and Startup Steps

To deploy and start JFTF-App locally, follow these steps:

1. Execute the script found in `deploy_jftf_app.sh`. First, navigate to the `scripts/deploy` directory in your terminal.
2. The script will install and start the JFTF-App application.
3. Once the deployment is complete, JFTF-App will be accessible at `localhost:4173` in your web browser.

Please note that the provided instructions assume a Unix-based environment. Adjustments may be needed if you are using a different operating system.

## License

JFTF-App is open source software, released under the [MIT License](./LICENSE).
