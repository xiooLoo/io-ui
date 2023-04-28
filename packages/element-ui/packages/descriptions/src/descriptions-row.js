export default {
  name: 'ToDescriptionsRow',
  props: {
    row: {
      type: Array
    }
  },
  inject: ['toDescriptions'],
  render(h) {
    const { toDescriptions } = this;
    const row = (this.row || []).map(item => {
      return {
        ...item,
        label: item.slots.label || item.props.label,
        ...['labelClassName', 'contentClassName', 'labelStyle', 'contentStyle'].reduce((res, key) => {
          res[key] = item.props[key] || toDescriptions[key];
          return res;
        }, {})
      };
    });
    if (toDescriptions.direction === 'vertical') {
      return (
        <tbody>
          <tr class="to-descriptions-row">
            {
              row.map(item => {
                return (
                  <th
                    class={{
                      'to-descriptions-item__cell': true,
                      'to-descriptions-item__label': true,
                      'has-colon': toDescriptions.border ? false : toDescriptions.colon,
                      'is-bordered-label': toDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan={item.props.span}
                  >{item.label}</th>
                );
              })
            }
          </tr>
          <tr class="to-descriptions-row">
            {
              row.map(item =>{
                return (
                  <td
                    class={['to-descriptions-item__cell', 'to-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span}
                  >{item.slots.default}</td>
                );
              })
            }
          </tr>
        </tbody>
      );
    }
    if (toDescriptions.border) {
      return (
        <tbody>
          <tr class="to-descriptions-row">
            {
              row.map(item=> {
                return ([
                  <th
                    class={{
                      'to-descriptions-item__cell': true,
                      'to-descriptions-item__label': true,
                      'is-bordered-label': toDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan="1"
                  >{item.label}</th>,
                  <td
                    class={['to-descriptions-item__cell', 'to-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span * 2 - 1}
                  >{item.slots.default}</td>
                ]);
              })
            }
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        <tr class="to-descriptions-row">
          {
            row.map(item=> {
              return (
                <td class="to-descriptions-item to-descriptions-item__cell" colSpan={item.props.span}>
                  <div class="to-descriptions-item__container">
                    <span
                      class={{
                        'to-descriptions-item__label': true,
                        'has-colon': toDescriptions.colon,
                        [item.labelClassName]: true
                      }}
                      style={item.labelStyle}
                    >{item.label}</span>
                    <span
                      class={['to-descriptions-item__content', item.contentClassName]}
                      style={item.contentStyle}
                    >{item.slots.default}</span>
                  </div>
                </td>);
            })
          }
        </tr>
      </tbody>
    );
  }
};
