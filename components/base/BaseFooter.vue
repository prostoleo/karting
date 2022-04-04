<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__logo logo-footer">
        <div class="logo-footer__logo">
          <img
            loading="lazy"
            src="/ForzaKart.svg"
            width="150"
            height="24"
            alt="Логотип ForzaKart"
            class="logo-footer__logo-img"
          />
        </div>
        <!-- /.logo-footer__logo -->
        <small class="logo-footer__copy">©️ Все права защищены. 2022.</small>
        <!-- /.logo-footer__copy -->
      </div>
      <!-- /.footer__logo -->
      <div class="footer__nav nav">
        <ul class="nav__list">
          <li class="nav__item">
            <a href="#advantages" class="nav__link">Преимущества</a>
            <!-- /.nav__link -->
          </li>
          <!-- /.nav__item -->
          <li class="nav__item">
            <a href="#karts" class="nav__link">Карты</a>
            <!-- /.nav__link -->
          </li>
          <!-- /.nav__item -->
          <li class="nav__item">
            <a href="#questions" class="nav__link">Вопросы</a>
            <!-- /.nav__link -->
          </li>
          <!-- /.nav__item -->
          <li class="nav__item">
            <a href="#sales" class="nav__link">Акции</a>
            <!-- /.nav__link -->
          </li>
          <!-- /.nav__item -->
          <li class="nav__item">
            <a href="#contacts" class="nav__link">Контакты</a>
            <!-- /.nav__link -->
          </li>
          <!-- /.nav__item -->
        </ul>
        <!-- /.nav__list -->
      </div>
      <!-- /.footer__nav -->
      <div class="footer__btn btn-footer">
        <button class="btn btn-footer__btn">Забронировать</button>
        <!-- /.btn btn-footer__btn -->
      </div>
      <!-- /.footer__btn -->
    </div>
    <!-- /.container footer__container -->
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  background: $redMy-900;

  padding: 30px 0;

  // .footer__container

  &__container {
    @include mq(2sm) {
      display: grid;
      grid-template-columns: max-content 1fr auto;
      grid-auto-flow: column;

      gap: 1rem;
    }
  }

  // .footer__logo

  &__logo {
    margin-bottom: 1rem;

    @include mq(2sm) {
      margin-bottom: 0;
    }
  }

  // .footer__nav

  &__nav {
  }

  // .footer__btn

  &__btn {
  }
}

.logo-footer {
  margin-left: 0.75rem;

  @include mq(2sm) {
    margin-left: 0;
  }

  // .logo-footer__logo

  &__logo {
    max-width: 150px;

    margin-bottom: 0.5rem;
  }

  // .logo-footer__logo-img

  &__logo-img {
    display: block;
    width: 100%;
  }

  // .logo-footer__copy

  &__copy {
    font-size: 12px;
    opacity: 0.7;

    color: white;
  }
}
.nav {
  @include mq(2sm) {
    display: flex;
    justify-content: center;
  }

  // .nav__list

  &__list {
    padding: 0;

    display: grid;
    gap: 10px;

    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
  }

  // .nav__item

  &__item {
  }

  // .nav__link

  &__link {
    padding: 0.5rem 0.75rem;
    font-size: 14px;
    font-weight: 400;

    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
}
.btn-footer {
  margin-top: 1.5rem;
  margin-left: 0.75rem;

  @include mq(2sm) {
    margin: 0;
  }

  // .btn-footer__btn

  &__btn {
    font-size: 14px;
    font-family: 'Arimo', sans-serif;
    font-weight: 600;

    padding: 0.75em 1.25em;
    background: transparent;

    color: white;

    border: 1px solid white;

    &:hover {
      opacity: 0.8;
    }
  }
}
.btn {
}
</style>
