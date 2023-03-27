import AboutCmp from './components/About.vue';
import HomeCmp from './components/Home.vue';
import TrainingCmp from './components/Training.vue';
import ContactCmp from './components/Contact.vue';
export const routes = [
{path: '' , component: HomeCmp},
{path: '/about' , component: AboutCmp},
{path: '/training' , component: TrainingCmp},
{path: '/contact' , component: ContactCmp}
];