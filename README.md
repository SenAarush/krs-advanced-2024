
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` : Port to run app

`DB` : MongoDB Atlas connection string


## Models

#### Model for Todos
```js
userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }

```



#### Model for Users
```js
user = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}

```
## API Reference

#### **Routes for Users**

|Route|Method|Request|Description|Success Response|
| :-------- | :------- | :------------------------- |---|---|
|`/register`|`POST`|name, email, pass, cPass|Register new user|User created|
| `/login` | `POST`|email, pass, cPass|User authentication, token generation|Login success|
| `/delete/:email` | `DELETE`|pass|Delete existing user|User deleted|

#### **Routes for Todos**

|Route|Method|Request|Description|Success Response|
| :-------- | :------- | :------------------------- |---|---|
|`/todos`|`GET`|name, email, pass, cPass|Fetch todos for an existing user|Todos fetched|
| `/todos` | `POST`|title, description, status|Create a todo|Todo created|
| `/todos/:todoID` | `PATCH`|title, description, status|Edit existing todo|Todo updated|





