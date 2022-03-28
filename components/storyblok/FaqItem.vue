<template>
  <li v-editable="story" class="faq__item" :class="{ active: isOpen }">
    <button class="accordion faq__item-title" @click="toggleAccordion">
      <ion-icon src="/tire.svg"></ion-icon>
      <h3>{{ story.summary }}</h3>
    </button>
    <div v-html="richtext(story.details)" class="panel faq__item-content"></div>
    <!-- <a class="uk-accordion-title faq__item-title" href="#">
      <ion-icon src="/tire.svg"></ion-icon>
      <h3>{{ story.summary }}</h3>
    </a>
    <div
      class="uk-accordion-content faq__item-content"
      v-html="richtext(story.details)"
    ></div> -->
  </li>
</template>

<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
import { richtext } from '~/utils/storyblok/storyblok.js';

/* acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
} */

export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      story: this.blok,
      richtext,
      isOpen: false,
    };
  },
  mounted() {
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));
  },

  methods: {
    toggleAccordion($event) {
      const btn = $event.target.closest('.accordion');
      const panel = btn.nextElementSibling;

      if (this.isOpen) {
        panel.style.maxHeight = null;
      } else {
        // panel.style.maxHeight = panel.scrollHeight + 'px';
        // panel.style.maxHeight = panel.offsetHeight + 'px';
        const FaqStyles = window.getComputedStyle(
          document.querySelector('.faq')
        );
        const PaddingInnerCompSt =
          FaqStyles.getPropertyValue('--padding-inner');
        console.log('PaddingInnerCompSt: ', PaddingInnerCompSt);

        panel.style.maxHeight = `${
          panel.scrollHeight + parseInt(PaddingInnerCompSt) * 2
        }px`;
      }

      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.faq {
  --padding-inner: 14px;
  --transition-dur: 150ms;
  --max-w: 500px;

  // .faq__item

  &__item {
    // background: $orangeMy;
    max-width: var(--max-w);
    width: 100%;

    @include mq(xl) {
      max-width: unset;
    }

    /* &.uk-open {
      ion-icon {
        transform: rotate(90deg);
        transition: transform var(--transition-dur) ease-in;
      }
    } */
    &.active {
      ion-icon {
        transform: rotate(90deg);
        transition: transform var(--transition-dur) ease-in;
      }

      .faq__item-content {
        padding: var(--padding-inner);
        transition: max-height 0.2s ease-out, padding 0.2s ease-out;
      }
    }
  }

  // .faq__item-title

  &__item-title {
    padding: var(--padding-inner);

    cursor: pointer;

    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-auto-flow: column;
    gap: 10px;

    background: $orangeMy;
    width: 100%;

    ion-icon {
      font-size: 30px;

      transform: rotate(0deg);
      transition: transform var(--transition-dur) ease-in;
    }

    h3 {
      color: $redMy-900;
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      text-align: left;

      @include mq(lg) {
        font-size: 24px;
      }
    }

    &:hover,
    &:focus {
      outline: 2px solid $redMy-400;
    }

    &::before {
      display: none;
    }
  }

  // .faq__item-content

  &__item-content {
    padding: var(--padding-inner);

    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;

    color: black;
    background: white;

    max-height: 0;
    padding: 0 var(--padding-inner);
    overflow: hidden;
    transition: max-height 0.2s ease-out, padding 0.2s ease-out;

    @include mq(med) {
      font-size: 16px;
    }

    p {
      margin: 0 !important;
    }
  }
}
</style>
