module BluePitsCompliments
  # Combines the handwritten compliments with the imported Trustpilot reviews
  # into one newest-first list, removing duplicated entries.
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      manual = Array(site.data["compliments"])
      reviews = Array(site.data.dig("reviews", "reviews"))

      items = manual.map { |item| normalize_manual(item) } +
              reviews.map { |item| normalize_review(item) }

      site.data["all_compliments"] =
        dedupe(items)
          .each_with_index
          .sort_by { |item, index| [item["date"].to_s, -index] }
          .reverse
          .map(&:first)
    end

    private

    def normalize_manual(item)
      text = item["text"].to_s

      {
        "author" => item["author"].to_s,
        "title" => item["title"].to_s,
        "text" => text,
        "date" => item["date"].to_s,
        "display_date" => item["display_date"].to_s,
        "rating" => nil,
        "url" => nil,
        "source" => "compliment",
        "key" => dedupe_key(item["author"], text),
      }
    end

    def normalize_review(item)
      text = item["text"].to_s

      {
        "author" => item["author"].to_s,
        "title" => item["title"].to_s,
        "text" => text,
        "date" => item["date"].to_s,
        "display_date" => "",
        "rating" => item["rating"],
        "url" => item["url"].to_s,
        "source" => "trustpilot",
        "key" => dedupe_key(item["author"], text),
      }
    end

    def dedupe_key(author, text)
      normalized = text.downcase.gsub(/\s+/, " ").strip[0, 120]
      "#{author.to_s.downcase.strip}|#{normalized}"
    end

    def dedupe(items)
      best = {}

      items.each do |item|
        current = best[item["key"]]
        if current.nil? || priority(item) > priority(current)
          best[item["key"]] = item
        end
      end

      best.values
    end

    def priority(item)
      item["source"] == "trustpilot" ? 2 : 1
    end
  end
end
