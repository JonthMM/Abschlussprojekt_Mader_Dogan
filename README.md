# Abschlussprojekt_Mader_Dogan
<h4>Authors:  Jonathan Mader, matr.Nr.: 502644 - Erkam Dogan, matr.Nr.: 508236</h4>

Dies ist unser repository für die Abschlussaufgabe des Kurses Geosoftware 1 im Sommersemester 22!

Dockerhub: https://hub.docker.com/repository/docker/jonthnm/aufgabe7 <br>

Hier funktioniert die Kommunikation mit der mongodb leider nicht, da der Server abstürzt sobald ein POST Befehl stattfindet.

<h2>Tutorial</h2>
<br>
Um die Anwendung mit Docker zu starten klonen Sie das Repository und speichern es Lokal.
Öffnen Sie es dann in ihrer IDE und öffnen das Terminal. Dort geben Sie folgenden Befehl ein:
<br>
$ docker-compose up
<br>
(Etwas Geduld muss hier für den Download mitgebracht werden)
<br>
Die Website ist dann Erreichbar unter:<br>
http://localhost:3000/
<br>
<br>
Außerdem ist es möglich das Projekt als pure Node Anwendung ohne Docker zu starten (dann funktioniert auch die Kommunikation zur Datenbank).<br>
Klonen Sie das Repository und speichern es Lokal.<br>
Öffnen Sie es dann in ihrer IDE und öffnen das Terminal. Dort geben Sie folgenden Befehl ein:
<br>
$ npm install <br>
und dann <br>
$ npm start <br>
<br>
Die Website ist dann erreichbar unter:<br>
http://localhost:3000/
<br>
