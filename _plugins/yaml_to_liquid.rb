module Jekyll

  class YamlToLiquid < Liquid::Tag
    def initialize(tag_name, arg, tokens)
      super
    end

    def render(context)
      yml = YAML::load(File.read('/Users/diogo/Development/new.diogomonica.com/timeline/_timeline.yml'))
      context.registers[:page]['yml'] = yml
      nil
    end
  end
end

Liquid::Template.register_tag('yaml_to_liquid', Jekyll::YamlToLiquid)

