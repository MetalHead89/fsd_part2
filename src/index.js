import './index.scss';
require.context('@/scss', true, /\.scss$/);
require.context('@/pages', true, /\.scss$/);
require.context('@/common.blocks', true, /\.scss$/);

// Scripts
import '@/common.blocks/calendar/calendar';
import '@/common.blocks/dropdown/dropdown';
import '@/common.blocks/like-button/like-button';
import '@/common.blocks/navbar/navbar';
import '@/common.blocks/header/header';
import '@/common.blocks/impressions-diagram/impressions-diagram';
import '@/common.blocks/pagination/pagination';
import '@/common.blocks/range-slider/range-slider';
import '@/common.blocks/text-field/text-field';
import '@/common.blocks/number-card/number-card';
import '@/common.blocks/room-rate-card/room-rate-card';
