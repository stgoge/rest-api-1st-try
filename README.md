# allmax
Тестовое задание для кандидата на
должность NodeJS разработчика

Написать TODO лист с авторизацией, регистраций и ролями (admin/user).
admin - может видеть все задачи, user может видеть только свои. У задач
должны быть приоритеты. Пользователь должен уметь фильтровать
задачи по их приоритету или статусу выполнения.
Технологии для реализации: Express/Koa, MongoDB/PostgreSQL​.
Также вы можете использовать любую библиотеку, какую захотите.
Результатом должен быть репозиторий на Github с оформленным readme.

/signup - registration
/signin - authorization
get /records - get record list
post /records - create new record
put /records/ID - update record by ID
delete /records/ID - delete record by ID

record scheme:
"record" - string
"priority" - number
"status" - number