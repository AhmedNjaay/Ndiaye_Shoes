import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
       
        root.render(
        <LaravelReactI18nProvider
            locale={'fr'}
            fallbackLocale={'en'}
            files={import.meta.glob('/lang/*.json')}
        >
            <App {...props} />
        </LaravelReactI18nProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
