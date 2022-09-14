# Abschlussprojekt_Mader_Dogan
<h4>Authors:  Jonathan Mader, matr.Nr.: 502644 - Erkam Dogan, matr.Nr.: 508236</h4>

Dies ist unser repository für die Abschlussaufgabe des Kurses Geosoftware 1 im Sommersemester 22!

Dockerhub: https://hub.docker.com/repository/docker/jonthnm/projektaufgabe_mader_dogan	 <br>

<h2>Tutorial</h2>
<br>
Um die Anwendung mit Docker zu starten ziehen Sie sich das Image von Docker hub und lassen es laufen mit dem mongo und dem mongo-express Container
<br>
$ docker-compose up
<br>
(Etwas Geduld muss hier für den Download mitgebracht werden)
<br>
Die Website ist dann Erreichbar unter:<br>
http://localhost:3000/
<br>
Leider ist es nicht möglich, dass repository zu klonen und dann mit 
<br>
$ docker-compose up
<br>
zu starten, da dann die npm install und npm start version nicht mehr gehen würde, da hier für die 
<br> 
const url = "mongodb://127.0.0.1:27017";
<br>
in den routes benötigt wird, für docker allerdings
<br>
const url = "mongodb://mongo:27017";
<br>
Diese Version des Abschlussprojekts ist durch Dockerhub gegeben.
<br>

Außerdem ist es möglich das Projekt als pure Node Anwendung ohne Docker zu starten 
<br>
Klonen Sie das Repository und speichern es Lokal.<br>
Öffnen Sie den Ordner dann in ihrer IDE und öffnen das Terminal. Dort geben Sie folgenden Befehl ein:
<br>
$ npm install <br>
und dann <br>
$ npm start <br>
<br>
Die Website ist dann erreichbar unter:<br>
http://localhost:3000/
<br>
