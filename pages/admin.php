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
			<!-- <div class="admin-bar">
					<h2 class="open-all">Расскрыть все</h2>
					<h2 class="close-all">Закрыть все</h2>
					<div class="cart-margin"></div>
					<ul>
						<li><a href="/pages/admin.php#"><h2>объект 1</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 2</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 3</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 4</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 5</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 6</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 7</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 8</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 9</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 10</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 11</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 12</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 13</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 1</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 2</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 3</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 4</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 5</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 6</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 7</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 8</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 9</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 10</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 11</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 12</h2></a></li>
						<li><a href="/pages/admin.php#"><h2>объект 13</h2></a></li>
					</ul>
				</div>
				<div class="obj-cart-con">
					<div class="obj-cart-form-adm-con">
						<form class="obj-cart-form-adm" action="#">
							<div class="obj-cart">
								<div class="obj-cart-main">
									<div class="mini-photo-con">
										<img src="/assets/img/mech/ASV-6-4000/1.jpg" alt="">
									</div>
										<div class="obj-cart-title">
											<input type="text" class="input-adm-main in-title" value="Название" readonly>
											<input type="text" class="input-adm-main" value="Подкатегория">
										</div>
										<div class="trash">
								
											<img class="img-adm-main input-adm-change"  src="/assets/svg/change.svg" alt="">
											<img class="img-adm-main" src="/assets/svg/delete.svg" alt="">
										</div>
									</div>
									<div class="obj-cart-down">
										<img src="/assets/svg/arrow-green.svg" alt="">
									</div>
									

									<div class="obj-cart-dop">
										<div class="cart-descript-con">
											<input class="input-adm-main" type="textarea" value="Описание Описание  Описание">
											<input class="input-adm-main" type="text" value="Характиристики">
											<input class="input-adm-main" type="text" value="фильтр">
										</div>
										<input type="submit" class="input-adm-main btn input-adm-submit" value="Изменить">
									</div>
							</div>
						</form>
					</div>
				</div>
			</div> -->
	</div>


	<?php include "../components/modal.php"?>






</body>
</html>
	 