layui.define("form", function(exports) {
	var $ = layui.jquery,
		form = layui.form,
		tips = [],
		mojia = {
			init: function(elem) {
				form.render();
				var ts = this;
				$(elem).each(function(idx, item) {
					var that = $(this),
						selds = [];
					that.find('option:selected').each(function() {
						selds.push($(this).val());
					})
					that.next().addClass('mo-many-info').find('.layui-select-title').click(function() {
						tips[idx] && $(this).find('input').val(tips[idx].join(','));
					}).next().find('dd').each(function() {
						var dt = $(this),
							checked = (dt.hasClass('layui-this') || $.inArray(dt.attr('lay-value'), selds) > -1) ? 'checked' : '',
							title = dt.text(),
							disabled = dt.attr('lay-value') === '' ? 'disabled' : '';
						dt.addClass('mo-many-this').html('<input type="checkbox" lay-skin="primary" title="' + title + '" ' + checked + ' ' + disabled + '>');
						ts.selected(idx, that, dt);
					}).click(function(data) {
						var dt = $(this);
						if (data.target.localName == 'dd' && dt.attr('lay-value') !== '') {
							var status = dt.find('.layui-form-checkbox').toggleClass('layui-form-checked').hasClass('layui-form-checked');
							dt.find('input').prop('checked', status);
						}
						dt.parents('.layui-form-select').addClass('layui-form-selected');
						var top = $(this).parents('.layui-form-select').offset().top + $(this).parents('.layui-form-select').outerHeight() + 5 - $(window).scrollTop(),
							dlHeight = $(this).parents('.layui-form-select').find('dl').outerHeight();
						if (top + dlHeight > $(window).height() && top >= dlHeight) {
							dt.parents('.layui-form-select').addClass('layui-form-selectup');
						}
						ts.selected(idx, that, dt);
					});
				})
				form.render('checkbox');
			},
			selected: function(idx, that, dt) {
				var value = [];
				tips[idx] = [];
				value[idx] = [];
				that.find('option').prop('selected', false);
				dt.parents('dl').find('[type=checkbox]:checked').each(function() {
					var val = $(this).parent().attr('lay-value');
					that.find('option[value=' + val + ']').prop('selected', true);
					tips[idx].push($(this).attr('title'));
					value[idx].push(val);
				});
				dt.parents('dl').prev().find('input').val(tips[idx].join(','));
				dt.parents('.layui-form-select').prev().prev().val(value[idx].join(','));
				dt.removeClass('layui-this');
			}
		};
	exports('multiple', mojia);
});
