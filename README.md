# home1
View the contents of folder /www/my_folder with depth view 2:
node stats.js /www/my_folder 2

Notes:
1. let depthArray = [] // Contains a set lines and gaps from previous levels
2. depth='start'  //  Startup initialization. If the link is to a file, and not to a folder, then display it and exit.
