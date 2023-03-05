# Github Search

This web application helps user to search any repository over github and view it's details

## Features

- Search Page to find any repository
- Listing page to view all search results for the given query
- Detailed description page of any repository
- Mobile responsive

## Run Locally

Clone the project

```bash
  git clone https://github.com/yashjsalian23/elchemy-github-search
```

Go to the project directory

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm start
```

## Demo

View the web app here : https://phenomenal-pastelito-939a6c.netlify.app/

Video Link: https://www.loom.com/share/c0c2ce3f3aaf4c118676ec02c730ff77

## API Reference

#### Get all repositories with conditions

```http
  GET https://api.github.com/repos/{owner}/{repo}
```

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `owner`   | `string` | Name of owner      |
| `repo`    | `string` | Name of repository |

#### Get item

```http
  GET https://api.github.com/search/repositories?q=${:searchQuery}&page=${:page}&per_page=${:per_page}
```

| Parameter     | Type      | Description                                       |
| :------------ | :-------- | :------------------------------------------------ |
| `searchQuery` | `string`  | Query which would be matched with repository name |
| `page`        | `integer` | Page number, depends on per_page                  |
| `per_page`    | `integer` | Number of records returned in a single page       |
