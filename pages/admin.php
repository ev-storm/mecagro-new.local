   	<title>mecagro | admin</title>
	<?php include "../components/head.php"?>



<body>
	<?php include "../components/menu.php"?>



	<div class="container container-admin">


		<div id="login-container-con" class="login-container-con">
			<div class="login-container">
					<div>
						<img src="/assets/svg/logo.svg" alt="">
						<h2>Вход в учетную запись</h2>
					</div>
					<form id="loginForm">
							<input class="btn admin-input" type="text" id="username" placeholder="Имя пользователя:" required>
							<br>
							<input class="btn admin-input" type="password" id="password" placeholder="Пароль:" required>
							<br>
							<button class="btn admin-btn" type="submit">Войти</button>
					</form>
					<h2 id="message" class="error"></h2>
			</div>
		</div>

		<div class="content-con">
			
		</div>

	</div>


	<?php include "../components/modal.php"?>





</body>
</html>
	 