<!DOCTYPE html>
<html>
<head>
	<title>Water Saving</title>
	<link type="image/gif" rel="icon" href="favicon/favicon.gif"/>
	<link type="text/css" rel="stylesheet" href="css/styleWater.css"/>
</head>
<body>
<section>
<h1>Quick water info</h1>
<p>Water. People use it every day for many different things. 3% of water is fresh water and the other 97% is salt water. Water is also used by animals and plants</p>
<h1>Our water</h1>
<p>Again people use water everyday. But some people waste water. Wasting water isn't good. People should stop wasting water.</p>
<h1>Water saving</h1>
<h2>Easy things</h2>
<p>Here is a list of easy things you can do to save water</p>
<ul>
<li>Don't leave tap on</li>
<li>Take not-to-long showers</li>
<li>Don't just take a glass of water that you won't finish</li>
</ul>
<h2>My idea</h2>
<p>So as I said before 3% of water is fresh water. But why just use 3%, why not the other 97%?. Yes, it's salt water but people can just extract the salt. Than you got more fresh water and salt. So now there is no need for mining salt.</p>
<p>But this idea requires a lot of energy. So for this to be possible, powerful <b>renewable</b> energy would have to exist.</p>

<p>Please click the button below if you agree.</p>
<form method="POST">
<input type="submit" class="submit_button" name="sub" value="I agree">

</body>
</html>
<?php
session_start();
$counter_name = "counter.txt";
ini_set('display_errors', 0);
// Check if a text file exists.
// If not create one and initialize it to zero.
if (!file_exists($counter_name)) {
- $f = fopen($counter_name, "w");
- fwrite($f,"0");
- fclose($f);
}

// Read the current value of our counter file
$f = fopen($counter_name,"r");
$counterVal = fread($f, filesize($counter_name));
fclose($f);

// Has visitor been counted in this session?
// If not, increase counter value by one
if ($_POST["sub"])
{
  if(!isset($_SESSION['hasVisited'])){
    
    $_SESSION['hasVisited']="yes";
    $counterVal++;
    $f = fopen($counter_name, "w");
    fwrite($f, $counterVal);
    fclose($f);
  }
}

echo "<p>$counterVal people agree</p>";
?>