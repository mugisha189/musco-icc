# CHANGELOGS

This is for describing why somethings have changed

## Postgres -> MongoDB

As we wanted to store predictions as composite objects it wasn't possible to declare prediction as composite object
as relational db's doesn't support it (Needs to have a specific model for it which complicates things)
