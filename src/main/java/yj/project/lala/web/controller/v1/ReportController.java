package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.report.ReportService;
import yj.project.lala.application.report.model.CategorySummary;

import java.util.List;

@RequestMapping("/api/v1/report")
@RestController
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping
    public List<CategorySummary> getReport(@RequestParam int year, @RequestParam int month) {
        return reportService.getCategorySummary(year, month);
    }
}
