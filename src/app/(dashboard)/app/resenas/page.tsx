import ReviewsScreen from '@/features/reviews/components/ReviewsScreen/ReviewsScreen';
import s from './resenas-page.module.css';

export default function ResenasPage() {
  return (
    <section className={s.page}>
      <ReviewsScreen />
    </section>
  );
}
