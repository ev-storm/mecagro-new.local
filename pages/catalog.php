	<title>mecagro | Каталог</title>
	<?php include "../components/head.php"?>

	<style>
			.catalog-btn{
				color: #ffffff99!important;
			}
			.mob-catalog-btn{
				color: #58c88a!important;
			}
	</style>

<body>
	<?php include "../components/menu.php"?>

	<?php include "../components/modal.php"?>

	<div class="container">
		<div class="catalog-vue">
		
		<?php include "../components/categories.php"?>
			<div class="object-con">
				<?php include "../components/s-part.php"?>
				<div class="object-all-prevue active">
					<!-- <div class="obj-all-card">
						<img src="${obj.photo}" alt="">
						<h1>${obj.name}</h1>
						<h2>${obj.cod}</h2>
						<h3>${obj.filter}</h3>
					</div>
					<div class="obj-all-card"></div>
					<div class="obj-all-card"></div> -->
				</div>
				<div class="object">

					<div class="object-prevue">
						<div class="swiper-con">
							<div class="swiper object-swiper">
								<div class="swiper-wrapper object-swiper-wrapper">
									<!-- <div class="swiper-slide object-slide-prev object-slide">
										<img src="/assets/img/mech/prev/1.jpg" alt="">
									</div>
									<div class="swiper-slide object-slide-prev object-slide">
										<img src="/assets/img/mech/prev/2.jpg" alt="">
									</div>
									<div class="swiper-slide object-slide-prev object-slide">
										<img src="/assets/img/mech/prev/3.jpg" alt="">
									</div>
									<div class="swiper-slide object-slide-prev object-slide">
										<img src="/assets/img/mech/prev/4.jpg" alt="">
									</div> -->
								</div>
								<div class="swiper-button-next"></div>
								<div class="swiper-button-prev"></div>
							</div>
							<div thumbsSlider="" class="swiper object-swiper_mini">
								<div class="swiper-wrapper object-swiper-wrapper_mini">
									<!-- <div class="swiper-slide object-slide_mini"></div> -->
								</div>
							</div>
						</div>
						<div class="object-btn">
							<div>
								<button class="btn btn-modal-call form-data">Получить консультацию</button>
								<button class="btn-light btn-modal-call form-data-leasing">Лизинг</button>
							</div>
								<button class="btn-light download-cat">Скачать каталог
									<ul>
										<li><a target="_blanc" href="/assets/img/brend/Mecagro.pdf"><h2>MECARGO PDF</h2></a></li>
										<li><a target="_blanc" href="/assets/img/brend/BARGAM.pdf"><h2>BARGAM PDF</h2></a></li>
										<li><a target="_blanc" href="/assets/img/brend/Mosh.pdf"><h2>MOSH PDF</h2></a></li>
									</ul>
								</button>
									
						</div>
					</div>
					<div class="object-descripcion-con">
						<div class="green-line"></div>
						<div class="object-descripcion">
							<div class="object-categoty_main">
								<h2 class="object-categoty_main-text"> </h2>
							</div>
							<div class="object-name_main">
								<h1 class="object-name_main-text"></h1>
							</div>
							<div class="object-descripcion_main">
								<h3 class="object-descripcion_main-text" id="description">
									
								</h3>
								<!-- <button id="readMoreBtn" style="display: none;">Читать далее</button> -->
							</div>
						</div>
					</div>
					<div class="object-specifications">
						<table class="object-specifications_table">
							<!-- 
							<tr>
									<td><h1>Вместимость бака</h1></td>
									<td><h1>1,0 / 1,5 / 2,0 м3</h1></td>
							</tr>
							<tr>
									<td><h1>Расход рабочей жидкости</h1></td>
									<td><h1>200 – 1000 л/га</h1></td>
							</tr>
							<tr>
									<td><h1>Транспортная скорость</h1></td>
									<td><h1>20 км/ч</h1></td>
							</tr>
							<tr>
									<td><h1>Число обслуживающего персонала</h1></td>
									<td><h1>1 чел</h1></td>
							</tr>
							<tr>
									<td><h1>Масса машины сухая, не более</h1></td>
									<td><h1>600 / 800 / 900 кг</h1></td>
							</tr> -->
							
						</table>
					</div>
				</div>
			</div>
		</div>


	






	<?php include "../components/footer.php"?>

</body>
</html>