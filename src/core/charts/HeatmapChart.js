import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { colors } from '../../constants'
import { useI18n } from 'core/i18n/i18nContext'
import HeatmapChartRow from './HeatmapChartRow'

const backgroundColorScale = scaleLinear()
    .domain([-20, -10, 0, 10, 20])
    .range([colors.teal, colors.tealDark, colors.navy, colors.blueDark, colors.blue])

const textColorScale = scaleLinear()
    .domain([-20, -10, 0, 10, 20])
    .range([colors.navy, colors.navyDark, colors.navy, colors.tealLight, colors.tealLight])

const colorLegendGradient = `linear-gradient(${[
    `to right`,
    backgroundColorScale(-20),
    backgroundColorScale(-10),
    backgroundColorScale(0),
    backgroundColorScale(10),
    backgroundColorScale(20)
].join(', ')})`

const HeatmapChart = ({ keys, items, i18nNamespace }) => {
    const { translate } = useI18n()
    const [currentIndex, setCurrentIndex] = useState(null)

    return (
        <>
            <div
                className="Heatmap"
                style={{
                    gridTemplateColumns: `auto ${'70px '.repeat(keys.length + 1)}`
                }}
            >
                <div className="Heatmap__Legend">{translate(`${i18nNamespace}.axis_legend`)}</div>
                <div className="Heatmap__Header">{translate(`average`)}</div>
                {keys.map(key => {
                    return (
                        <div key={key} className="Heatmap__Header">
                            {translate(`${i18nNamespace}.${key}.shorter`)}
                        </div>
                    )
                })}
                {items.map((item, i) => (
                    <HeatmapChartRow
                        key={item.id}
                        item={item}
                        keys={keys}
                        index={i}
                        backgroundColorScale={backgroundColorScale}
                        textColorScale={textColorScale}
                        setCurrent={setCurrentIndex}
                        isActive={currentIndex === i}
                        isInactive={currentIndex !== null && currentIndex !== i}
                        isEven={i % 2 === 0}
                    />
                ))}
                <div className="Heatmap__ColorLegend__Label">
                    {translate(`difference_from_average_usage`)}
                </div>
                <div
                    className="Heatmap__ColorLegend"
                    style={{
                        gridColumnEnd: keys.length + 3
                    }}
                >
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(-20)
                        }}
                    >
                        -20%
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(-10)
                        }}
                    >
                        -10%
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(0)
                        }}
                    >
                        0
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(10)
                        }}
                    >
                        +10%
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(20)
                        }}
                    >
                        +20%
                    </span>
                </div>
            </div>
        </>
    )
}

HeatmapChart.propTypes = {
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            average: PropTypes.number.isRequired
        })
    ).isRequired,
    i18nNamespace: PropTypes.string.isRequired
}

export default memo(HeatmapChart)