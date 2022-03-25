<script>
import gsap from 'gsap';

export default {
  data() {
    return {
      tlNav: null,
    };
  },

  mounted() {
    const tlNav = gsap.timeline({ paused: true });

    tlNav
      .set('a.nav__link', {
        opacity: 0,
        yPercent: 50,
      })
      .set('.nav__item button', {
        opacity: 0,
        yPercent: 75,
      })
      .to('header nav', {
        x: 0,
        opacity: 1,
        zIndex: 30,
      })
      .to('a.nav__link', {
        opacity: 1,
        yPercent: 0,
        duration: 0.15,
        stagger: 0.05,
        ease: 'Back.easeOut.config(1.2)',
      })
      .to(
        '.nav__item button',
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.15,
          ease: 'Back.easeOut.config(1.2)',
        },
        '<0.15'
      )
      .reverse();

    this.tlNav = tlNav;

    window.addEventListener('resize', () => {
      if (window.innerWidth > 950) {
        this.tlNav.kill();
      }
    });
  },

  methods: {
    toggleMenu() {
      this.$refs.menuBurger.classList.toggle('active');
      this.$refs.overlay.classList.toggle('hidden');

      // about toggle gsap animation - https://greensock.com/forums/topic/26236-toggle-animation/#:~:text=The%20easiest%20way%20to%20toggle,toggle%20the%20reversed()%20state.
      this.tlNav.reversed(!this.tlNav.reversed());
    },
  },
};
</script>

<template>
  <!-- <header class="header bg-redMy-900 text-white py-5"> -->
  <header class="header">
    <div class="container">
      <div class="header__content">
        <div class="header__logo">
          <img src="/ForzaKart.svg" alt="логотип ForzaKart" />
        </div>
        <button ref="menuBurger" class="header__burger" @click="toggleMenu">
          <span></span>
          <span></span>
        </button>

        <nav class="nav shadow shadow-md shadow-light-100 lg: shadow-none">
          <ul class="nav__list">
            <li class="nav__item">
              <a href="#advantages" class="nav__link">Преимущества</a>
            </li>
            <!-- /.nav__item -->
            <li class="nav__item">
              <a href="#karts" class="nav__link">Карты</a>
            </li>
            <!-- /.nav__item -->
            <li class="nav__item">
              <a href="#questions" class="nav__link">Вопросы</a>
            </li>
            <!-- /.nav__item -->
            <li class="nav__item">
              <a href="#contacts" class="nav__link">Контакты</a>
            </li>
            <!-- /.nav__item -->
            <li class="nav__item nav__item--btn">
              <button class="cta">
                <span>Забронировать</span>
              </button>
            </li>
            <!-- /.nav__item -->
          </ul>
          <!-- /.nav__list -->
        </nav>
        <!-- /.nav -->
      </div>
    </div>
    <div
      ref="overlay"
      class="overlay bg-black/50 fixed inset-0 z-10 hidden"
      @click="toggleMenu"
    ></div>
  </header>
</template>

<style lang="scss" scoped>
button.header__burger {
  --space-burger: 16px;
  --dimension: 35px;
  --stroke-height: 2px;
  --padding-btn: 10px;
  --padding-btn-x2: 20px;

  // width: var(--dimension, 50px);
  // height: var(--dimension, 50px);

  padding: var(--padding-btn);

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // justify-content: space-between;

  gap: var(--space-burger);

  position: relative;
  z-index: 1;

  @include mq(lg) {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: var(--padding-btn);
    right: var(--padding-btn);

    width: calc(100% - var(--padding-btn-x2));
    height: var(--stroke-height);

    background: white;

    transform: translate(0, -50%);
    opacity: 1;

    transition: opacity 100ms ease-in-out;
  }

  span {
    display: block;
    width: var(--dimension, 25px);
    height: var(--stroke-height);

    background: white;
    border-radius: 2%;

    transform-origin: 15% center;
    transform: rotate(0deg);
    transition: transform 150ms ease-in-out;
  }

  &.active {
    z-index: 20;

    &::after {
      opacity: 0;
      transition: opacity 100ms ease-in-out;
    }
  }

  &.active span:first-of-type {
    transform: rotate(45deg);
  }
  &.active span:last-of-type {
    transform: rotate(-45deg);
  }
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;

  padding: 20px 0;
  background: transparent;
  color: white;
  background: $redMy-900;

  // .header__content

  &__content {
    display: flex;
    align-items: center;

    justify-content: space-between;
  }

  // .header__logo

  &__logo {
    z-index: 1;
  }

  // .header__burger

  &__burger {
    background: transparent;
  }
}
.nav {
  --pad-x: 1rem;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  width: 75%;
  max-width: 20rem;

  padding: 4rem 1rem;

  background: #000;

  transform: translateX(-120%);
  opacity: 0;

  z-index: 10;

  @include mq(lg) {
    position: static;
    inset: unset;

    width: unset;
    max-width: unset;
    background: unset;

    padding: unset;
    transform: unset;
    opacity: 1;
    z-index: 2;
  }

  // .nav__list

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @include mq(lg) {
      flex-direction: row;
      align-items: center;
    }
  }

  // .nav__item

  &__item {
  }

  // .nav__link

  &__link {
    position: relative;

    display: block;
    padding: 0.5em var(--pad-x);

    // outline: 1px solid green;
    transform: scale(1) translateX(0);

    transition: all 150ms ease-in-out;

    &::after {
      content: '';
      position: absolute;

      left: 0;
      top: 0;
      bottom: 0;

      width: 3px;
      height: 100%;

      background: $redMy-500;

      opacity: 0;
      transition: all 150ms ease-in-out;
    }

    &:hover,
    &:focus {
      color: $redMy-500 !important;
      transform: scale(1.05) translateX(0.5rem);
      transition: all 150ms ease-in-out;

      &::after {
        transform: translateX(-0.5rem);
        opacity: 1;
        transition: all 150ms ease-in-out;
      }
    }
  }

  // .nav__item--btn

  &__item--btn {
    margin-top: 1.5rem;
    margin-left: var(--pad-x);

    @include mq(lg) {
      margin: 0;
    }

    button.cta {
      display: inline-block;
      padding: 0.75em 1.25em;

      color: white;
      background: transparent;
      border: 1px solid currentColor;

      line-height: 100%;
      font-weight: 500;

      transition: all 150ms ease-in-out;

      &::after {
        display: none;
      }

      &:hover,
      &:focus {
        color: $redMy-500;
      }

      span {
        display: block;
        z-index: -1;

        color: inherit;

        font-size: 16px;
        font-family: 'Lato', Helvetica, sans-serif;
        line-height: 100%;
        font-weight: 500;

        transform: translateY(-1px);
      }
    }
  }
}
</style>
