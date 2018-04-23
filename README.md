# ReactMongoLanding http://208.68.36.212/
React and Mongo Landing page to capture name, email, phone.

``Guest User Credentials``
```
email: guest@gmail.com
password: secure123!@#

```

## API Documentation
Here's the description of the API! 

### Port - Location of all endpoints to interface with our API is at `http://208.68.36.212:3040`

### User API Section

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

## [POST] `/api/user`
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

### Response
```
{
    "user": {
        "_id": "5add31d9963cf0b2681019cb",
        "name": "Test User",
        "email": "guest@gmail.com",
        "password": "$2a$11$qVx.VudbuUdPyDu3riO/WuP5FkKGvUZAK7Rt3hV/vVmUMK3AtExVC",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZGQzMWQ5OTYzY2YwYjI2ODEwMTljYiIsIm5hbWUiOiJUZXN0IFVzZXIiLCJlbWFpbCI6Imd1ZXN0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDExJHFWeC5WdWRidVVkUHlEdTNyaU8vV3VQNUZrS0d2VVpBSzdSdDNoVi92Vm1VTUszQXRFeFZDIiwiX192IjowfSwiYWNjZXNzIjp0cnVlLCJpYXQiOjE1MjQ0NDU2NTgsImV4cCI6MTUyNDQ0NTcxOH0.s2gNe41Mr5Lu0mL_8z90nX6fvN2mlrNsNeIEA85xWEo"
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

### Lead API Section

## [GET] `/api/lead`
| Endpoint          | Type          | Data  |
|:-----------------:|:-------------:| -----:|
| /api/lead         | GET           | json  |

### Example:
```
[
    {
        "_id": "5acf9837e870f5cfdade2145",
        "name": "Stewart",
        "lastname": "Gonzoiuyh",
        "email": "Makenna70@hotmail.com",
        "phone": "595-488-3534",
        "__v": 0
    },
    {
        "_id": "5acf9837e870f5cfdade2146",
        "name": "Rebeka",
        "lastname": "Howe",
        "email": "Damion59@hotmail.com",
        "phone": "427-676-9888",
        "__v": 0
    }
]
```

## [POST] `/api/lead`
| Endpoint     | Type          | Data  |
| ------------ |:-------------:| -----:|
| /api/lead    | POST          | json  |

### Example:
```
{
 	name:"Jhon",
 	lastname:"Dou",
 	email:"email@gmail.com",
 	phone:"123-123-1234"
}
```

## [PUT] `/api/lead`
| Endpoint     | Type          | Data  |
| ------------ |:-------------:| -----:|
| /api/lead    | PUT           | json  |

### Example:
```
{
    "_id": "5add2ca8a55dc6b188cd87a2",
    "name": "Jhon updated"
}
```

### Response:
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

## [POST] `/api/lead/delete`
| Endpoint            | Type          | Data   |
| ------------------- |:-------------:| ------:|
| /api/lead/delete    | POST          | array  |

### Example:
```
[ '5acf9837e870f5cfdade2147', '3acf9837e870f5cfdade2148' ]

```
### Response:
```
{ n: 2, ok: 1 }

```