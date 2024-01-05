# Companies and employees CRUD

Api with Create, Read, Update and Delete (CRUD) functionality for companies and employees.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Tests](#tests)
- [Coverage Report](#coverage-report)

## Getting Started

To get started with the **Companies and Employees CRUD** API, follow these steps:

1 - Ensure you have Python `3.9.0` installed on your local machine;

2 - Clone the repository to your local machine;

3 - Install the necessary dependencies using `pip`:

```shell
pip install -r requirements.txt
```

4 - Copy the `.env.example` file to a new file named `.env`;

5 - Update the `.env` file with the appropriate configuration settings, including the database connection details and other project settings;

6 - Set up the database by running the following command:

```shell
python manage.py migrate
```

7 - Create the users that will be able to access the api:

```shell
python .\manage.py create_default_users
```
> The default users are: `admin_user` and `normal_user`. The password for all of them is: `techBix`.

8 - Update database with default data:

```shell
python .\manage.py load_default_data
```

> This command will populate the database with the default data provided in the `fixtures/initial_data.json` file from the `companies` and `employees` apps.

9 - Run the application locally using the following command:

```shell
python manage.py runserver
```

> The application will be available at the provided URL;

## Usage

The **Companies and Employees CRUD** API allows you to manage companies and their associated employees. You can perform the following actions:

1 - Create a new company or employee;

2 - Read and view details of existing companies and employees;

3 - Update the information of a company or employee;

4 - Delete a company or employee from the database;

To perform any of these actions, send a request to the appropriate endpoint using the appropriate HTTP method. For example, to create a new company, send a `POST` request to the `/companies/` endpoint with the relevant data in the request body.

Check the [API Documentation and Collection](https://www.postman.com/emerson-mm-filho/workspace/companies-and-employees-crud) in postman for more details on the available endpoints and the data they expect.

## Tests

The **Companies and Employees CRUD** API includes a comprehensive set of tests to ensure the functionality and integrity of the application. To run the tests and measure code coverage, you can follow these steps:

1 - Ensure that the necessary testing dependencies, including the coverage package, are installed. You can install them using the following command:

```shell
pip install -r requirements-testing.txt
```

2 - Run the test suite using the provided testing command.

```shell
python manage.py test
```

3 - To measure code coverage, use the coverage package by running the following command:

```shell
coverage run manage.py test
```

> This command will execute the default test command of Django and run all the tests while collecting coverage data.

## Coverage Report

You can generate a coverage report by running the following command:

```shell
coverage report --omit manage.py
```

> This command will display a coverage report in the console, showing the percentage of code coverage for your project.

Additionally, you can generate an HTML coverage report by running the following command:

```shell
coverage html
```

> This command will generate an HTML report that you can open in your web browser to view the coverage details in a more interactive manner.
