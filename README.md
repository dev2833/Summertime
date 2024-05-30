I need a backend for a react app. Functions:
1. Upload CSV to database
- if field (booking) exist updated that row, if field (booking) don't exist add a new row
- on successful import display imported data
- on failed import return error message
- After successful import, delete the csv file, so it doesn't clutter the server.
- Clean database from older than 5 days from the departure dates database entries, so it doesn't clutter the database.
2. View all entries
3. Delete entries
Delete all entries form a selected date. 
So I will have a dropdown With dates and can select Departure date and delete all entries from that day.
4. Check booking:
- user provide booking number, check if that booking exist and return booking data. 
- if the booking number doesn't exist, return a message.