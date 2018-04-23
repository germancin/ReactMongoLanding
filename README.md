# ReactMongoLanding http://208.68.36.212/
React and Mongo Landing page to capture name, email, phone.

## API Documentation
Here's the description of the Game API! 

## Port - Location of all endpoints to interface with our API is at `http://208.68.36.212:3040`

## [GET] `/api/user`
| Endpoint          | Type          | Data  |
|:-----------------:|:-------------:| -----:|
| /api/user         | GET           | json  |

### Example:
```
[
    {
        "_id": "5ad9944ca3b9ce81b0312ee5",
        "name": "Admin User",
        "email": "admin@email.com",
        "password": "$2a$11$15T294I11X.Gpjz7oDstJ.DkbAUrv.Gbu5.m6gshLHlayPi.hFoo.",
        "__v": 0
    },
    {
        "_id": "5ad9b4b15c8d75892ac15bbb",
        "name": "Admin User3",
        "email": "admin2@email.com",
        "password": "$2a$11$kaOl0EsQSuZ2I4umm2qLUej5wsFnJsdKiXldgJCkcvjkLXNZnOTbK",
        "__v": 0
    }
]
```

## [POST] `/api/user/getUsers`
| Endpoint     | Type          | Data  |
| ------------ |:-------------:| -----:|
| /api/user    | POST          | json  |

### Example:
```
{
	name:"Jhon",
	email:"email@gmail.com",
	password:"securepassword"
	
}
```

## [POST] `/api/user/sign_in`
| Endpoint          | Type          | Data  |
| ----------------- |:-------------:| -----:|
| /api/user/sign_in |  POST         | json  |

### Example:
```

{
    email:"5abe7b02dc27588864299016"
    password:"securepassword",
}

```

## [GET] `/api/user/validate_token
| Endpoint                 | Type          | Data  |
| ------------------------ |:-------------:| -----:|
| /api/user/validate_token | GET           | json  |


### Example response:
```
{ 
    user:
        { 
            _id: '5ad9944ca3b9ce81b0312ee5',
             name: 'Admin User',
             email: 'admin@email.com',
             password: '$2a$11$15T294I11X.Gpjz7oDstJ.DkbAUrv.Gbu5.m6gshLHlayPi.hFoo.',
             __v: 0 
        },
        access: true,
        iat: 1524441279,
        exp: 1524455679 

}
```

## [GET] `/api/user/log_out
| Endpoint                 | Type          | Data  |
| ------------------------ |:-------------:| -----:|
| /api/user/log_out        | GET           | json  |

Clear cookies.


