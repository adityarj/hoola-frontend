"# hoola-frontend" 
Open www for all the assets

# README from backend

* Ruby version

we're using ruby 2.3.1

# API Documentation

## User API

### CREATE

To create a user submit a POST request to /api/v1/auth with the params:
1. username
2. email
3. first_name
4. last_name
5. email
6. city
7. password
8. password_confirmation

cURL equivalent
curl  -X POST -d "username=user" -d "first_name=john" -d "last_name=doe" -d "city=Singapore" -d "email=email@example.com" -d "password=password123" -d "password_confirmation=password123" http://localhost:3000/api/v1/auth

### DELETE

To delete a user submit a DELETE request to /api/v1/auth which will delete users identified by their id and auth_token header

### UPDATE

To update user info submit a PUT request to /api/v1/auth with params:
1. password
2. password_confirmation
3. whatever you want to update

cURL equivalent
curl  -X PUT -d "username=not_user" -d "password=password123" -d "password_confirmation=password123" http://localhost:3000/api/v1/auth

### SIGN IN

To sign in submit a POST request to /api/v1/auth/sign_in with params:
1. email
2. password

curl  -X POST -d "email=email@example.com" -d "password=password123" http://localhost:3000/api/v1/auth/sign_in

### SIGN OUT

To sign out submit a DELETE request to /api/v1/auth/sign_out

curl -i -X DELETE http://localhost:3000/api/v1/auth/sign_out -F access-token="RxSwk-hukd3L8dGf2qgXpg" -F uid="email@example.com" -F client="eaq4SuJzHMHN3uyvcBa-fg"

### VALIDATE TOKEN

Use this to validate tokens on client return visit, method: GET params:
1. id
2. auth_token

curl  -X GET -d "id=1" -d "auth_token=token" http://localhost:3000/api/v1/auth/validate_token

### HEADER

HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
access-token: RxSwk-hukd3L8dGf2qgXpg
token-type: Bearer
client: eaq4SuJzHMHN3uyvcBa-fg
expiry: 1476863313
uid: email@example.com
ETag: W/"7e7a8bbbe5c6ca583e3e4ff0bfe44cc1"
Cache-Control: max-age=0, private, must-revalidate
X-Request-Id: 6300e3b9-bf7d-4e10-a8bf-8cda66cf15d7
X-Runtime: 0.394717
Transfer-Encoding: chunked