# AST Analysis Tree

```
Client Behavior
-- Events
-- -- addEventListener ✅
-- -- onmessage ✅
-- -- postmessage ✅
-- -- onhashchange ✅
-- eval ✅
-- document.domain ✅
-- -- Assignment ✅
-- -- Read ✅
-- window.open ✅
-- innerHTML ✅
-- fetch ✅
-- URLSearchParams ✅
-- Window Location ✅
-- -- Assignment ✅
-- -- -- search ✅
-- -- -- href ✅
-- -- -- location ✅
-- -- Read ✅
-- -- -- search ✅
-- -- -- href ✅
-- -- -- location ✅
-- window.name ✅
-- Storage ✅
-- -- Cookie ✅
-- -- -- Assignment ✅
-- -- -- Read ✅
-- -- localStorage ✅
-- -- -- getItem ✅
-- -- -- setItem ✅
-- -- sessionStorage ✅
-- -- -- getItem ✅
-- -- -- setItem ✅
Object Schemas ✅
-- fetch options ✅
Data
-- URLs ✅
-- Path ✅
-- -- API ✅
-- -- Path ✅
-- -- URL ✅
-- -- Query ✅
-- Hostname ✅
-- Regex ✅
-- -- Match ✅
-- -- Pattern ✅
-- Secret ✅
-- -- [dynamic] ✅
-- GraphQL ✅
-- -- mutation ✅
-- -- query ✅
-- -- other ✅
Frameworks ✅
-- React ✅
-- -- dangerouslySetInnerHTML ✅
```
