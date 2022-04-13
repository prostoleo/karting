<template>
  <div class="slider glide">
    <div data-glide-el="track" class="glide__track">
      <!--  -->
      <ul class="glide__slides slider__list">
        <li
          v-for="slide in story.slides"
          :key="slide._uid"
          class="glide__slide slider__item slide"
          tabindex="-1"
        >
          <div class="slide__inner">
            <div class="slide__front">
              <img
                :data-src="`${slide.kart_img.filename}/m/0x250`"
                :alt="slide.kart_img.alt"
                height="250"
                class="slide__front-img lazy"
                loading="lazy"
              />
              <div class="slide__front-footer">
                <h3 class="slide__front-title">
                  {{ slide.title }}
                </h3>
              </div>
            </div>
            <!-- /.slide__front -->
            <div class="slide__back back">
              <h3 class="back__title">
                {{ slide.title }}
              </h3>
              <div class="back-row">
                <span class="back__name">Тип:</span>
                <p class="back__desc">{{ slide.type }}</p>
              </div>
              <!-- /.slide__back-row -->
              <div class="back-row">
                <span class="back__name">Резина:</span>
                <p class="back__desc">{{ slide.tire }}</p>
              </div>
              <!-- /.slide__back-row -->
              <div class="back-row">
                <span class="back__name">Тормоза:</span>
                <p class="back__desc">{{ slide.brakes }}</p>
              </div>
              <!-- /.slide__back-row -->
              <div class="back-row">
                <span class="back__name">Двигатель:</span>
                <p class="back__desc">{{ slide.engine }}</p>
              </div>
              <!-- /.slide__back-row -->
              <div class="back-row">
                <span class="back__name">Вес:</span>
                <p class="back__desc">{{ slide.weight }}</p>
              </div>
              <!-- /.slide__back-row -->
              <div v-html="richtext(slide.description)" class="back-row"></div>
              <!-- /.slide__back-row -->
              <!-- <button class="btn slide__back-btn">Назад</button> -->
              <!-- /.btn slide__back-btn -->
            </div>
            <!-- /.slide__back -->
          </div>
        </li>
      </ul>
    </div>
    <div class="glide__arrows" data-glide-el="controls">
      <button
        class="glide__arrow glide__arrow--left"
        data-glide-dir="<"
        aria-label="К предыдущему слайду"
      >
        <ion-icon
          :src="story.arrow_img.filename"
          :alt="story.arrow_img.alt"
          class="glide__arrow-img"
        ></ion-icon>
      </button>
      <button
        class="glide__arrow glide__arrow--right"
        data-glide-dir=">"
        aria-label="К следующему слайду"
      >
        <ion-icon
          :src="story.arrow_img.filename"
          :alt="story.arrow_img.alt"
          class="glide__arrow-img"
        ></ion-icon>
      </button>
    </div>
    <div class="glide__bullets" data-glide-el="controls[nav]">
      <button
        v-for="(_, index) in story.slides"
        :key="index"
        class="glide__bullet"
        :data-glide-dir="`=${index}`"
        :aria-label="`К слайду номер ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['karts'],
};
</script>

<style lang="scss" scoped></style>
