import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Вопросы',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                Присоединяйся к группе в телеграмм, добавляй свои вопросы и темы для обсуждения, в которых ты хотел бы разобраться
            </>
        ),
    },
    {
        title: 'Обсуждения',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                Участвуй в обсуждении активных тем, добавляй ссылки на статьи, видео и выражай свое мнение в чатах
            </>
        ),
    },
    {
        title: 'Ответы',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                Итоговый результат будет сохранен на этом сайте. Ты можешь вернуться к статье в любое время и освежить знания в памяти
            </>
        ),
    },
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')} style={{paddingTop:100}}>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
