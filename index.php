<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAZA PUCHAROWA</title>
    <link href="css/fontello/css/lato.css" type="text/css" rel="stylesheet">
    <link href="css/group.css" type="text/css" rel="stylesheet">
    <!-- <link href="css/bracket.css" type="text/css" rel="stylesheet"> -->
</head>

<body>
    <section id='formCreation'>
        <label for='name'>Nazwa turnieju</label>
        <input class="text" type="text" name="name" placeholder="Mój turniej">
        <h2 class='mobileWholeWidth'>FAZA PUCHAROWA*</h2>
        <label class='mobileWholeWidth' for='play_offs'>Ilość rund</label>
        <select class='mobileWholeWidth' name='play_offs'>
            <option value="1">Finał</option>
            <option value="2">Finał, Półfinały</option>
            <option value="4">Finał, Półfinały, Ćwierćfinały</option>
            <option value="8">Finał, Półfinały, Ćwierćfinały, 1/16</option>
            <!-- <option value="16">Finał, Półfinały, Ćwierćfinały, 1/16, 1/32</option> -->
        </select>
        <label for='revange_group'>Rewanże</label>
        <input type="checkbox" name="revange_bracket" style='width: 30px'>
        <a class="button mobileWholeWidth" href='#' onclick="createGroup('EDIT')">Dalej</a>
        <!-- <a class="button mobileWholeWidth" href='#' onclick="stratBracket()">Dalej</a> -->
    </section>

    <section id='dashboardGroups'>
        <!-- GIVE RIGHTS: EDIT - ALLOWS TO EDIT MATCHES/SCORE/TEAMS; OTHERS NO -->
    </section>


    <script src="js/structure.js" type='text/javascript'></script>
    <script src="js/group.js" type='text/javascript'></script>
    <!-- <script>
        (function() {

        })();
    </script> -->
    <!-- JavaScript -->
    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <!-- JSX -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Load our React component. -->
    <script src="js/my_react.js" type='text/babel'></script>
</body>

</html>